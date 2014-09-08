var cfapi_url = 'http://codeforamerica.org/api/organizations/Code-for-San-Francisco/projects';

// Go get projects! Then show them off.
$.getJSON(cfapi_url, showProjects);

function showProjects(response){

  projects = response.objects;

  // loop through our project data
  $.each(projects, function(i, project){

    // to display text like 'x days ago' we use moment.js's awesome fromNow function
    // http://momentjs.com/docs/#/displaying/fromnow/
    project['last_updated_formatted'] = moment(project['last_updated']).fromNow();

  });
  $("#hack-night-projects").append(ich.projects({projects:projects}));

  // Follow next page links
  if (response.pages.next) {
    $.getJSON(response.pages.next, showProjects);
  }
//
}
