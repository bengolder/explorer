define([
'views/topic_list',
'views/show_item'
], 
function (
	TopicList,
	ShowItem
	) {
var module = {};

console.log("TopicList class:", [TopicList]);

TopicList.menuName = function(){return 'list';};
ShowItem.menuName = function(){return 'show item';};

module.visualizations = [
	TopicList,
	ShowItem
	];

return module;
});
