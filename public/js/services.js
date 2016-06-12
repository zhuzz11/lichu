angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Books', function(){
  var books = [{
    id:0,
    title:'lichu',
    description:"that's good",
    date:"2016-06-07 10:15:17"
  },{
    id:1,
    title:'lichu',
    description:"快乐的一天",
    date:"2016-06-07 10:15:17"
  },{
    id:2,
    title:'lichu',
    description:"大姨妈来了",
    date:"2016-06-07 10:15:17"
  },{
    id:3,
    title:'lichu',
    description:"感冒了",
    date:"2016-06-07 10:15:17"
  }];

  return {
    all: function(){
      return books;
    }

  };


})



;
