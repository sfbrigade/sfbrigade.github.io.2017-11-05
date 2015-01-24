---
---
var projectData =
{
{% for post in site.posts reversed | sort: title %}
{% if post.layout == 'projects' %}
{% assign id_array = post.path | split:"/" %}
  	"{{id_array[2]}}": {
  		"url" : "{{post.url}}"
  	} {% unless forloop.last %},{% endunless%}
{% endif %}
{% endfor %}
};