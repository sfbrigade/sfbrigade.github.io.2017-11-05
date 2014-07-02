var projects_table;
        // Set this up like this to make it easier to dev this locally -- evz
        var data_host = 'http://codeforamerica.org/api/organizations/Code-for-San-Francisco/projects';
        // var data_host = 'http://civic-json.datamade.dev.work'

        // helper function for displaying messages when submitting projects
        function displayMessage(message, type) {
          $( "#submit-message" ).fadeOut(function() {
            $( "#submit-message" ).attr('class', 'alert alert-' + type);
            $( "#submit-message" ).html(message);
          });
          $( "#submit-message" ).fadeIn();
        }

        $('#share-toggle').click(function(){
          $('#share-project').slideToggle();
          return false;
        });

        $('#project-needs').click(function(){
          projects_table.fnFilter( 'project needs' );
          $.address.parameter('search', 'project needs');
          $('#hack-night-projects').ScrollTo();
          return false;
        });

        // AJAX form submission to civic-json-worker
        // https://github.com/open-city/civic-json-worker
        $('#submit-project').click(function(){

          $.post(
            data_host + '/add-project/',
            data={'project_url': $('#github-url').val()},
            function(resp){
              displayMessage( "<strong>Your project has been submitted!</strong> It should display below within 5 minutes.", 'success' );
              $("#github-url").val("");
            }
            ).fail(function() {
              displayMessage( "<strong>Error submitting your project!</strong> Check that the URL is correct.", 'danger' );
            });

            return false;
          });

        // handle the case where someone hits the 'enter' key insted of the submit button
        $("#github-url").keydown(function(e){
          var key =  e.keyCode ? e.keyCode : e.which;
          if(key == 13) {
            $('#submit-project').click();
            return false;
          }
        });

        // this is a template used for mustache.js. Each one represents a table row.
        var template = "\
        <tr>\
        <td>\
        <h3><a href='{{code_url}}'>{{name}}</a></h3>\
        {{#github_details.homepage}}\
        <a href='{{homepage_formatted}}'>Website</a>\
        {{/github_details.homepage}}\
        <br /><strong>Created</strong>\
        {{github_details.created_at_formatted}}\
        {{#github_details.language}}\
        <br /><strong>Language</strong>\
        {{github_details.language}}\
        {{/github_details.language}}\
        <div class='clearfix'></div>\
        {{#github_details.participation_percent}}\
        <div class='bar'><span style='height: {{.}}%;'>{{.}}%</span></div>\
        {{/github_details.participation_percent}}\
        </td>\
        <td>\
        <p>{{github_details.description}}</p>\
        <h4>Contributors</h4>\
        <p class='contributors'>\
        {{#github_details.owner}}\
        <a href='{{html_url}}' class='contributor-owner'><img class='img-thumbnail' src='{{avatar_url}}' alt='Owner: {{login}}' title='Owner: {{login}}'/></a>\
        <span style='display: none;'>{{login}}</span>\
        {{/github_details.owner}}\
        {{#github_details.contributors}}\
        {{^owner}}\
        <a href='{{html_url}}'><img class='img-thumbnail' src='{{avatar_url}}' alt='{{login}}' title='{{login}}'/></a>\
        <span style='display: none;'>{{login}}</span>\
        {{/owner}}\
        {{/github_details.contributors}}\
        </p>\
        {{#has_project_needs}}\
        <h4 class='project-needs'>Project needs</h4>\
        {{#issues}}\
        <a href='{{html_url}}'><span class='label label-success'>{{title}}</span></a>\
        {{/issues}}\
        {{/has_project_needs}}\
        </td>\
        <td>\
        <a class='btn btn-default' href='{{github_details.html_url}}/commits/master'>{{github_details.recent_commits}} <i class='icon-plus-sign'></i></a>\
        </td>\
        <td>\
        <a class='btn btn-default' href='{{github_details.html_url}}/stargazers'>{{github_details.watchers_count}} <i class='icon-star'></i></a>\
        </td>\
        <td>\
        <a class='btn btn-default' href='{{github_details.html_url}}/network'>{{github_details.forks_count}} <i class='icon-code-fork'></i></a>\
        </td>\
        <td>\
        <a class='btn btn-default' href='{{github_details.html_url}}/issues'>{{github_details.open_issues}} <i class='icon-exclamation-sign'></i></a>\
        </td>\
        </tr>\
        ";

        $('#hack-night-projects tbody').spin({top: '40px'}); //show a spinner while loading data

        // The projects list to display
        var projects = []

        // Show off the projects
        function showProjects(data, textStatus, jqXHR){

          // Fill up the projects list
          projects = projects.concat(data.objects);

          // Follow next page links
          if (data.pages.next) {
            $.when( $.getJSON(data.pages.next) ).then(showProjects);

          } else {

            // update project count at the top of the page
            $('#project-count').html(Object.keys(projects).length);
            // loop through our json data
            $.each(projects, function(i, json){
        
              var participation = [];
              var max_participation = 50;
              if (json['github_details']['participation']) {
                for (var i = 0; i < json['github_details']['participation'].length; i++) {
                  var val = ((json['github_details']['participation'][i] + 1) / parseFloat(max_participation)) * 100;
                  if (val > 100) val = 100;
                  participation.push(val)
                }
                json['github_details']['participation_percent'] = participation;

                var recent_commits = 0;
                var recent_commits_arr = json['github_details']['participation'].splice(48,4); // get the last 4 weeks
                $.each(recent_commits_arr, function() {
                  recent_commits += this;
                });

                json['github_details']['recent_commits'] = recent_commits;
              }

              // to display text like 'x days ago' we use moment.js's awesome fromNow function
              // http://momentjs.com/docs/#/displaying/fromnow/
              json['github_details']['created_at_formatted'] = moment(json['github_details']['created_at']).fromNow();
              json['github_details']['updated_at_formatted'] = moment(json['github_details']['updated_at']).fromNow();
              json['has_project_needs'] = (json['issues'].length > 0);


              // check to make sure all our URL's have http:// in front of them
              // otherwise they won't link properly
              var prefix_regex = /^https?:\/\/.*/;
              var homepage = json['link_url'];
              if (homepage != null && !prefix_regex.test(homepage))
                json['homepage_formatted'] = "http://" + homepage;
              else
                json['homepage_formatted'] = homepage;

              // using the template above, add the project as a new row to our table
              $("#hack-night-projects tbody").append(Mustache.render(template, json));
            })

            // initialize datatables for sorting and searching
            // http://datatables.net/
            projects_table = $('#hack-night-projects').dataTable( {
              "aaSorting": [ [2,'desc'], [3, 'desc'] ],
              "aoColumns": [
              null,
              null,
              { "sType": "num-html" },
              { "sType": "num-html" },
              { "sType": "num-html" },
              { "sType": "num-html" }
              ],
              "bInfo": false,
              "bPaginate": false,
              "autoWidth": false,
              "columnDefs": [
                { "width": "345px", "targets": 0}
              ]
            } );

            // allows linking directly to searches
            if ($.address.parameter('search') != undefined)
              projects_table.fnFilter( $.address.parameter('search') );

            // when someone types a search value, it updates the URL
            $('#hack-night-projects_filter input').keyup(function(e){
              $.address.parameter('search', $('#hack-night-projects_filter input').val());
            });
          }
        }

        // Go get projects! Then show them off.
        $.when( $.getJSON(data_host) ).then(showProjects);