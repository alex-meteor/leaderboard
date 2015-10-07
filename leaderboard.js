
if (Meteor.isServer) {
    var mongoURL='mongodb://ro:ro@ds037283.mongolab.com:37283/word3';
    var database = new MongoInternals.RemoteCollectionDriver(mongoURL);
    PlayersList = new Mongo.Collection("players", { _driver: database });
    Words = new Mongo.Collection("words", { _driver: database });
    Meteor.publish('players', function() {
        return PlayersList.find({}, {sort: {score: -1}});
    });
    Meteor.publish('words', function() {
        return Words.find();
});

  var words = {
      "categories" : [
                      {
                      "games" : [
                                 {
                                 "words" : [
                                            "Aberdare",
                                            "Ballina",
                                            "Cobar",
                                            "Dapto",
                                            "Euston",
                                            "Forbes",
                                            "Ganmain",
                                            "Hay",
                                            "Inverell",
                                            "Jennings",
                                            "Kempsey",
                                            "Lawson",
                                            "Manilla",
                                            "Nabiac",
                                            "Pambula",
                                            "Raleigh",
                                            "Queensland",
                                            "Smithtown",
                                            "Tumut",
                                            "Uralla",
                                            "Walcha",
                                            "Walgett",
                                            "Yass",
                                            "Yeovil",
                                            "Young"
                                            ],
                                 "identifier" : 1,
                                 "name" : "Australia Towns"
                                 },
                                 {
                                 "words" : [
                                            "Ireland",
                                            "Sicily",
                                            "Zealand",
                                            "Sardinia",
                                            "Cyprus",
                                            "Majorca",
                                            "Crete",
                                            "Fyn",
                                            "Matta",
                                            "Iceland",
                                            "Corsica",
                                            "Euboea",
                                            "Amager",
                                            "Portsea",
                                            "Rhodes",
                                            "Ibiza",
                                            "Venice",
                                            "Chios",
                                            "Samos",
                                            "Sylt",
                                            "Wolin",
                                            "Hvar",
                                            "Capri",
                                            "Paros"
                                            ],
                                 "identifier" : 2,
                                 "name" : "Islands"
                                 }
                                 ],
                      "name" : "Places",
                      "identifier" : 1,
                      "bundle_id" : ""
                      },
                      {
                      "games" : [
                                 {
                                 "words" : [
                                            "Aberdare",
                                            "Ballina",
                                            "Cobar",
                                            "Dapto",
                                            "Euston",
                                            "Forbes",
                                            "Ganmain",
                                            "Hay",
                                            "Inverell",
                                            "Jennings",
                                            "Kempsey",
                                            "Lawson",
                                            "Manilla",
                                            "Nabiac",
                                            "Pambula",
                                            "Raleigh",
                                            "Queensland",
                                            "Smithtown",
                                            "Tumut",
                                            "Uralla",
                                            "Walcha",
                                            "Walgett",
                                            "Yass",
                                            "Yeovil",
                                            "Young"
                                            ],
                                 "identifier" : 3,
                                 "name" : "Australia Towns Purchased"
                                 },
                                 {
                                 "words" : [
                                            "Ireland",
                                            "Sicily",
                                            "Zealand",
                                            "Sardinia",
                                            "Cyprus",
                                            "Majorca",
                                            "Crete",
                                            "Fyn",
                                            "Matta",
                                            "Iceland",
                                            "Corsica",
                                            "Euboea",
                                            "Amager",
                                            "Portsea",
                                            "Rhodes",
                                            "Ibiza",
                                            "Venice",
                                            "Chios",
                                            "Samos",
                                            "Sylt",
                                            "Wolin",
                                            "Hvar",
                                            "Capri",
                                            "Paros"
                                            ],
                                 "identifier" : 4,
                                 "name" : "Islands Purchased"
                                 }
                                 ],
                      "name" : "Movies",
                      "identifier" : 6,
                      "bundle_id" : "com.mrott.words.package50"
                      }
                      ]
  };

var wordsNumber = Words.find().count();
  if(!wordsNumber) {
    Words.insert(words);
    console.log('Inserted Words');
  }

}


if(Meteor.isClient){
  PlayersList = new Mongo.Collection("players");
  Words = new Mongo.Collection('words');
  Meteor.subscribe('words');
  Meteor.subscribe('players');
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });

  Template.leaderboard.helpers({
    'player': function(){
       return PlayersList.find({},{sort: {score: -1}})
    },
    'selectedClass': function(){
       var playerId = this._id;
       var selectedPlayer = Session.get('selectedPlayer');
       if(playerId === selectedPlayer) {
         return "selected"
       }
    },
    'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)
    }
  });

  Template.leaderboard.events({
    "click .player": function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      });
    }
  });

  Template.removePlayer.events({
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });

}
