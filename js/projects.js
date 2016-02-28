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
  var featuredIndex = []; 
  // loop through our project data
  $.each(projects, function(i, project) {
    //if (project['tags'].indexOf("featured") > -1) {
    //  featuredIndex.push(i);
    //}
    // check to see if this project has a corresponding Jekyll page
    if (projectData[project['id']]) {
      project['cfsf_url'] = projectData[project['id']]['url'];
    }
    // add some variables to support adding a new Jekyll project post
    project['repository_nwo'] = {% if site.github.repository_nwo %}"{{site.github.repository_nwo}}"{% else %}" "{% endif %};
    project['default_branch'] = "{{site.defaultbranch}}";
    project['file_name'] = moment().format('YYYY-MM-DD-') + slugify(project['name']).toLowerCase() + ".md";
    // to display text like 'x days ago' we use moment.js's awesome fromNow function
    // http://momentjs.com/docs/#/displaying/fromnow/
    project['last_updated_formatted'] = moment(project['last_updated']).fromNow();

  });

  var template = $('#projects').html();

  var featuredDiv = document.createElement('div');
  featuredDiv.id = 'featured';
  $("#hack-night-projects").append(featuredDiv);
  $("#hack-night-projects").append(Mustache.render(template, { projects: projects }));
  // Follow next page links
  if (response.pages.next) {
    $.getJSON(response.pages.next, showProjects);
  }
//
}
