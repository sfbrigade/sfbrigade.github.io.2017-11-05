var data_host = 'http://codeforamerica.org/api/organizations/Code-for-San-Francisco/projects'
      var people_table;

      // this is a template used for mustache.js. Each one represents a table row.
      var template = "\
        <tr>\
          <td>\
            <a href='{{html_url}}'>\
              <img class='img-thumbnail' src='{{avatar_url}}' alt='{{login}}' />\
              {{name}}\
            </a>\
          </td>\
          <td>{{location}}</td>\
          <td><a href='projects.html#/?search={{login}}'>{{projects}}</a></td>\
          <td><a href='https://github.com/{{login}}?tab=activity'>{{contributions}}</a></td>\
        </tr>\
      ";

      $('#hack-night-people tbody').spin({top: '40px'}); //show a spinner while loading data

      // The projects list to work on
      var projects = []

      function showPeople( data, textStatus, jqXHR ) {
        // Fill up the projects list
        projects = projects.concat(data.objects);

        // Follow next page links
        if (data.pages.next) {
          $.when( $.getJSON(data.pages.next) ).then(showPeople);

        } else {

        // Loop through each project and add the contributors to the list
        var people = []
        $.each(projects, function (i, project){

            // Lots of Chicago people worked on the website. Don't show them on the people page.
            if (project.name != "sfbrigade.github.io") {
                people = people.concat(project.github_details.contributors);
            }

        });

        
        var peopleHash = {};
        // combine people data into single object representing one person with multiple contributions and projects
        $.each(people, function(i, person){
          if (person['name'] == null)
            person['name'] = person['login'];

          if(peopleHash.hasOwnProperty(person['name'])) {
            peopleHash[person['name']]['contributions'] += person['contributions'];
            peopleHash[person['name']]['projects'] += 1;
          } else {
            person['projects'] = 1;
            peopleHash[person['name']] = person;
          }
        });

        // update project count at the top of the page
        $('#people-count').html(Object.keys(peopleHash).length);

        $.each(peopleHash, function(i, json){
          console.log(i);
          console.log(json);
          $("#hack-night-people tbody").append(Mustache.render(template, json));
        });

        //

        // initialize datatables
        people_table = $('#hack-night-people').dataTable( {
            "aaSorting": [ [2,'desc'], [3, 'desc'] ],
            "aoColumns": [
                null,
                null,
                { "sType": "num-html" },
                { "sType": "num-html" }
            ],
            "bInfo": false,
            "bPaginate": false
        });

        // allows linking directly to searches
        if ($.address.parameter('search') != undefined)
          people_table.fnFilter( $.address.parameter('search') );

        // when someone types a search value, it updates the URL
        $('#hack-night-people_filter input').keyup(function(e){
          $.address.parameter('search', $('#hack-night-people_filter input').val());
        });
      }
    }

      $.when( $.getJSON( data_host ) ).then(showPeople);