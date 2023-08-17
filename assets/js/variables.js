---
layout: null
---
var siteVariables = {
{% for variable in site.variables %}
{%- if forloop.length > 0 -%}
  {{ variable[0] }}: "{{ variable[1] }}"{% if forloop.last == false %},
  {% endif %}
{%- endif -%}
{% endfor %}
};
