define([
'views/list',
'views/show_item'
], 
function (
	List,
	ShowItem
	) {
var module = {};

List.menuName = 'list';
ShowItem.menuName = 'show item';

module.visualizations = [
	List,
	ShowItem
	];

return module;
});
