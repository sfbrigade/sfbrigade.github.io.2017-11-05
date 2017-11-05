---
---
var projectData =
{
{% assign posts = site.posts | sort: title | reversed %}
{% for post in posts %}
{% if post.layout == 'projects' %}
{% assign id_array = post.path | split:"/" %}
  	"{{id_array[2]}}": {
  		"url" : "{{site.baseurl}}{{post.url}}"
  	} {% unless forloop.last %},{% endunless%}
{% endif %}
{% endfor %}
};
