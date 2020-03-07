console.log('This script populates some test Games, Users, Assets, Transactions and Market Items to your database');

var async = require('async');
var User = require('./models/User');
var Asset = require('./models/Asset');
var Game = require('./models/Game');
var Transaction = require('./models/Transaction');
var MarketItem = require('./models/MarketItem');

const InitiateMongoServer = require("./config/db");
const mongoose = require('mongoose');

// Initiate Mongo Server
InitiateMongoServer();

let users = [];
let assets = [];
let games = [];
let transactions = [];
let marketItens = [];

function randomInt(start,end) {
  return parseInt(Math.random()*(end-start)+start);
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function gameCreate(name, cb) {
    let game = new Game({ name: name });
         
    game.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New Game: ' + game.name);
        games.push(game);
        cb(null, game);
    });
}

function assetCreate(name, game, cb) {
    let asset = new Asset({
        name,
        game
     });
         
    asset.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New Asset: ' + asset.name);
        assets.push(asset);
        cb(null, asset);
    });
}

function userCreate(username, email, password, balance, assets, wishlist, cb) {
    let user = new User({
      username,
      email,
      password,
      balance,
      assets,
      wishlist
    });
         
    user.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New User: ' + user.username);
        users.push(user);
        cb(null, user);
    });
}

function transactionCreate(seller, buyer, asset, createdAt, cb) {
    let transaction = new Transaction({
        seller,
        buyer,
        asset,
        createdAt
    });    
         
    transaction.save(function (err) {
        if (err) {
          cb(err, null);
          return;
        }
        console.log('New Transaction');
        transactions.push(transaction);
        cb(null, transaction);
    });
}

function marketItemCreate(seller, asset, createdAt, cb) {
    let marketItem = new MarketItem({
        seller,
        asset,
        createdAt
    });
         
    marketItem.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('New Market Item');
        marketItens.push(marketItem);
        cb(null, marketItem);
    });
}

function populateGames(cb) {
    async.parallel([
        function(callback) {
            gameCreate('Game 01', callback);
        },
        function(callback) {
            gameCreate('Game 02', callback);
        },
        function(callback) {
            gameCreate('Game 03', callback);
        },
        function(callback) {
            gameCreate('Game 04', callback);
        },
        function(callback) {
            gameCreate('Game 05', callback);
        },
        function(callback) {
            gameCreate('Game 06', callback);
        },
        function(callback) {
            gameCreate('Game 07', callback);
        },
        function(callback) {
            gameCreate('Game 08', callback);
        },
        function(callback) {
            gameCreate('Game 09', callback);
        },
        function(callback) {
          gameCreate('Game 10', callback);
        }
    ],
    // optional callback
    cb);
}

function populateAssets(cb) {
  async.parallel([
      function(callback) {
        assetCreate('Asset 01', games[0], callback);
      },
      function(callback) {
        assetCreate('Asset 02', games[0], callback);
      },
      function(callback) {
        assetCreate('Asset 03', games[1], callback);
      },
      function(callback) {
        assetCreate('Asset 04', games[1], callback);
      },
      function(callback) {
        assetCreate('Asset 05', games[2], callback);
      },
      function(callback) {
        assetCreate('Asset 06', games[2], callback);
      },
      function(callback) {
        assetCreate('Asset 07', games[3], callback);
      },
      function(callback) {
        assetCreate('Asset 08', games[3], callback);
      },
      function(callback) {
        assetCreate('Asset 09', games[4], callback);
      },
      function(callback) {
        assetCreate('Asset 10', games[4], callback);
      },
      function(callback) {
        assetCreate('Asset 11', games[5], callback);
      },
      function(callback) {
        assetCreate('Asset 12', games[5], callback);
      },
      function(callback) {
        assetCreate('Asset 13', games[6], callback);
      },
      function(callback) {
        assetCreate('Asset 14', games[6], callback);
      },
      function(callback) {
        assetCreate('Asset 15', games[7], callback);
      },
      function(callback) {
        assetCreate('Asset 16', games[7], callback);
      },
      function(callback) {
        assetCreate('Asset 17', games[8], callback);
      },
      function(callback) {
        assetCreate('Asset 18', games[8], callback);
      },
      function(callback) {
        assetCreate('Asset 19', games[9], callback);
      },
      function(callback) {
        assetCreate('Asset 20', games[9], callback);
      }
  ],
  // optional callback
  cb);
}

function populateUsers(cb) {
  async.parallel([
      function(callback) {
        userCreate('username01', 'email01@teste.com', '123456', randomInt(1000,10000), 
        [
          {
            asset: assets[0],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[1],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[2],
          assets[3],
          assets[4]
        ], callback);
      },
      function(callback) {
        userCreate('username02', 'email02@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[2],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[3],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[3],
          assets[4],
          assets[5]
        ], callback);
      },
      function(callback) {
        userCreate('username03', 'email03@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[4],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[5],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[4],
          assets[5],
          assets[6]
        ], callback);
      },
      function(callback) {
        userCreate('username04', 'email04@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[6],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[7],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[5],
          assets[6],
          assets[7]
        ], callback);
      },
      function(callback) {
        userCreate('username05', 'email05@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[8],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[9],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[6],
          assets[7],
          assets[8]
        ], callback);
      },
      function(callback) {
        userCreate('username06', 'email06@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[10],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[11],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[9],
          assets[10],
          assets[11]
        ], callback);
      },
      function(callback) {
        userCreate('username07', 'email07@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[12],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[13],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[10],
          assets[11],
          assets[12]
        ], callback);
      },
      function(callback) {
        userCreate('username08', 'email08@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[14],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[15],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[13],
          assets[14],
          assets[15]
        ], callback);
      },
      function(callback) {
        userCreate('username09', 'email09@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[16],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[17],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[16],
          assets[17],
          assets[18]
        ], callback);
      },
      function(callback) {
        userCreate('username10', 'email10@teste.com', '123456', randomInt(1000,10000),
        [
          {
            asset: assets[18],
            amount: randomInt(10,100),
            selling: false
          },
          {
            asset: assets[19],
            amount: randomInt(10,100),
            selling: true
          }
        ],
        [
          assets[17],
          assets[18],
          assets[19]
        ], callback);
      },
      function(callback) {
        userCreate('username11', 'email11@teste.com', '123456', randomInt(1000,10000),
        [],
        [],
        callback);
      }
  ],
  // optional callback
  cb);
}

function populateTransactions(cb) {
  async.parallel([
      function(callback) {
        transactionCreate(users[0], users[1],
          {
            asset: assets[0],
            amount: randomInt(10,100)
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[0], users[1],
          {
            asset: assets[1],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[1], users[2],
          {
            asset: assets[2],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[1], users[2],
          {
            asset: assets[3],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[2], users[3],
          {
            asset: assets[4],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[2], users[3],
          {
            asset: assets[5],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[3], users[4],
          {
            asset: assets[6],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[3], users[4],
          {
            asset: assets[7],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[4], users[5],
          {
            asset: assets[8],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[4], users[5],
          {
            asset: assets[9],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[5], users[6],
          {
            asset: assets[10],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[5], users[6],
          {
            asset: assets[11],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[6], users[7],
          {
            asset: assets[12],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[6], users[7],
          {
            asset: assets[13],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[7], users[8],
          {
            asset: assets[14],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[7], users[8],
          {
            asset: assets[15],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[8], users[9],
          {
            asset: assets[16],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[8], users[9],
          {
            asset: assets[17],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[9], users[10],
          {
            asset: assets[18],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        transactionCreate(users[9], users[10],
          {
            asset: assets[19],
            amount: randomInt(10,100),
          }, 
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      }
  ],
  // optional callback
  cb);
}

function populateMarketItens(cb) {
  async.parallel([
      function(callback) {
        marketItemCreate(users[0],
          {
            asset: assets[0],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[0],
          {
            asset: assets[1],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[1],
          {
            asset: assets[2],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[1],
          {
            asset: assets[3],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[2],
          {
            asset: assets[4],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[2],
          {
            asset: assets[5],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[3],
          {
            asset: assets[6],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[3],
          {
            asset: assets[7],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[4],
          {
            asset: assets[8],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[4],
          {
            asset: assets[9],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[5],
          {
            asset: assets[10],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[5],
          {
            asset: assets[11],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[6],
          {
            asset: assets[12],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[6],
          {
            asset: assets[13],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[7],
          {
            asset: assets[14],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[7],
          {
            asset: assets[15],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[8],
          {
            asset: assets[16],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[8],
          {
            asset: assets[17],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[9],
          {
            asset: assets[18],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      },
      function(callback) {
        marketItemCreate(users[9],
          {
            asset: assets[19],
            amount: randomInt(10,100)
          },
          randomDate(new Date(2020,1,1),new Date(2020,3,1)),
          callback);
      }
  ],
  // optional callback
  cb);
}

async.series([
    populateGames,
    populateAssets,
    populateUsers,
    populateTransactions,
    populateMarketItens
],
// Optional callback
function(err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Games Instances: ' + games.length);
        console.log('Assets Instances: ' + assets.length);
        console.log('Users Instances: ' + users.length);
        console.log('Transactions Instances: ' + transactions.length);
        console.log('Market Itens Instances: ' + marketItens.length);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});