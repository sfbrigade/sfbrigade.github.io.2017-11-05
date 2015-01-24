---
---
function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9\s+]+/ig, '');
  text = text.replace(/\s+/gi, "-");
  return text;
}

var cfapi_url = 'http://codeforamerica.org/api/organizations/Code-for-San-Francisco/projects';

// Go get projects! Then show them off.
$.getJSON(cfapi_url, showProjects);

function showProjects(response){

  projects = response.objects;

  // loop through our project data
  $.each(projects, function(i, project){
    if(projectData[project['id']]) {
      project['cfsf_url'] = projectData[project['id']]['url'];
    }

    project['repository_nwo'] = {% if site.github.repository_nwo %}{{site.github.repository_nwo}}{% else %}" "{% endif %};
    project['file_name'] = moment().format('MM-DD-YYYY-') + slugify(project['name']).toLowerCase() + ".md";
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
