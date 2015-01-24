---
---
var projectData =
{
{% for post in site.posts reversed | sort: title %}
{% if post.layout == 'projects' %}
  	"{{post.api_id}}": {
  		"url" : "{{post.url}}"
  	} {% unless forloop.last %},{% endunless%}
{% endif %}
{% endfor %}
};