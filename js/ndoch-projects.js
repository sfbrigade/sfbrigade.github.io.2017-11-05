$(document).ready(function(){

  console.log("WHAT");

  var cfapi_url = 'http://codeforamerica.org/api/organizations/Code-for-San-Francisco/projects?q=ndoch';

  // Go get projects! Then show them off.
  $.getJSON(cfapi_url, showProjects);

  function showProjects(response){
    projects = response.objects;
    // loop through our project data
    $.each(projects, function(i, project){
      console.log(project);
      // buildup html for each project
      var html = `<li><h2>` + project.name + `</h2>
                  <p> `+ project.description + `</p>
                  <div class="row">
                    <div class="col-md-5">`
      if (project.link_url) {
        html += `<span class="glyphicon glyphicon-home"></span><a href=` + project.link_url + `>` + project.link_url + `</a><br />`
      }
      if (project.code_url) {
        html += ` <i class="fa fa-github-square"></i>
        <a href=` + project.code_url + `>` + project.code_url + `</a><br />`

      }
      html += `<strong>Last Updated: </strong>` + moment(project.last_updated).fromNow() + `
              </div>
            </div>
          </li>`

      $("#projects").append(html);
    });
  }

});
