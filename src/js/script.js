
var dbName = 'todo_list_store1';

sklad.open(dbName, {
  version: 2,
  migration: {
    '1': function (database) {
      var objStore = database.createObjectStore('todos', {autoIncrement: true});
      objStore.createIndex('toCountry_search', 'toCountryName', {unique: false});
      objStore.createIndex('inputAmount_search', 'inputAmount', {unique: false});
      objStore.createIndex('fromCountryName_search', 'fromCountryName', {unique: false});
      objStore.createIndex('outcomeAmount_search', 'outcomeAmount', {unique: false});
    },
    '2': function (database) {
      database.deleteObjectStore('todos');
      var objStore = database.createObjectStore('todos', {
        autoIncrement: true,
        keyPath: 'timestamp'
      });
      objStore.createIndex('toCountry_search', 'toCountryName', {unique: false})
      objStore.createIndex('inputAmount_search', 'inputAmount', {unique: false})
      objStore.createIndex('fromCountryName_search', 'fromCountryName', {unique: false})
      objStore.createIndex('outcomeAmount_search', 'outcomeAmount', {unique: false})
      objStore.createIndex('done', 'done', {unique: false});
    }
  }
},

function (err, conn) {

  if (err) { throw err; }
  $(function () {
    var $toCountryName = $('#toCountryName');
    var $inputAmount = $('#inputAmount');
    var $fromCountryName = $('#fromCountryName');
    var $outcomeAmount = $('#outcomeAmount');
    var $add         = $('#add');
    var $list        = $('#list')

    function updateRows(conn) {
      conn
        .get({
          todos: {toCountryName: sklad.DESC, index: 'toCountryName_search'}
        }, function (err, data) {
          if (err) { return console.error(err); }

          // TODO: do stuff here.
          $list.empty();
          data.todos.forEach(function (todo) {
            var $firstCountry = $(document.createElement('h2'));
            var $firstAmount = $(document.createElement('h1'));
            var $secCountry = $(document.createElement('h2'));
            var $secAmount = $(document.createElement('h1'));
            var $time = $(document.createElement('p'));
            // var $l = $(document.createElement('h2'));
            //if item is done
            if (todo.value.done) {
              $li.css({'display': 'none'})
            }
            $firstCountry.text(todo.value.toCountryName);
            $firstAmount.text(todo.value.inputAmount);
            $secCountry.text(todo.value.fromCountryName);
            $secAmount.text(todo.value.outcomeAmount);
            $time.text(todo.value.timestamp);
            $li.click (function () {
              todo.value.done = true;
              conn.upsert('todos', todo.value, function (err){
                if (err) {return console.error();}
                updateRows(conn);
              })
            });
            $list.append($time);
            $list.append($firstCountry);
            $list.append($secCountry);
            $list.append($firstAmount);
            $list.append($secAmount);
          })
        });
    }

    updateRows(conn);

    $add.click(function () {
      if (!$toCountryName.val().trim()) {
        return;
      }
      conn.insert({
        todos: [
          {
            timestamp: Date.now(),
            toCountryName: $toCountryName.val().trim(),
            inputAmount: $inputAmount.val().trim(),
            fromCountryName: $fromCountryName.val().trim(),
            outcomeAmount: $outcomeAmount.val().trim(),
            done: false
          }
        ]
      }, function (err, insertedKeys) {
        if (err) { return console.error(err); }
        $description.val('');
        updateRows(conn);
      })
    });
  });
});
