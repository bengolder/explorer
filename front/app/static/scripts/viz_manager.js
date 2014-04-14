define([
'views/list',
'views/show_item'
], 
function (
	List,
	ShowItem
	) {
var module = {};

List.menuName = function(){return 'list';};
ShowItem.menuName = function(){return 'show item';};

module.visualizations = [
	List,
	ShowItem
	];

return module;
});
