
var dbName = 'todo_list_store1';

sklad.open(dbName, {
  version: 2,
  migration: {
    '1': function (database) {
      var objStore = database.createObjectStore('todos', {autoIncrement: true});
      objStore.createIndex('description_search', 'description', {unique: false});
      // objStore.createIndex('fromname_search', 'fromCountryName');
      // objStore.createIndex('toname_search', 'toCountryName');
      // objStore.createIndex('currencyInpt_search', 'amount');
    },
    '2': function (database) {
      database.deleteObjectStore('todos');
      var objStore = database.createObjectStore('todos', {
        autoIncrement: true,
        keyPath: 'timestamp'
      });
      objStore.createIndex('description_search', 'description', {unique: false})
      objStore.createIndex('done', 'done', {unique: false});
    }
  }
},

function (err, conn) {

  if (err) { throw err; }
  $(function () {
    var $description = $('#description');
    var $toCountryName = $('#toCountryName');
    var $fromCountryName = $('#fromCountryName');
    var $add         = $('#add');
    var $list        = $('#list')

    function updateRows(conn) {
      conn
        .get({
          todos: {description: sklad.DESC, index: 'description_search'}
        }, function (err, data) {
          if (err) { return console.error(err); }

          // TODO: do stuff here.
          $list.empty();
          data.todos.forEach(function (todo) {
            var $li = $(document.createElement('h1'));
            // var $l = $(document.createElement('h2'));
            //if item is done
            if (todo.value.done) {
              $li.css({'display': 'none'})
            }
            $li.text(todo.value.description);
            $li.click (function () {
              todo.value.done = true;
              conn.upsert('todos', todo.value, function (err){
                if (err) {return console.error();}
                updateRows(conn);
              })
            });
            $list.append($li);
          })
        });
    }

    updateRows(conn);

    $add.click(function () {
      if (!$description.val().trim()) {
        return;
      }
      conn.insert({
        todos: [
          {
            timestamp: Date.now(),
            description: $description.val().trim() + $toCountryName.val() + $fromCountryName.val(),
            country: $toCountryName.val(),
            country: $fromCountryName.val(),
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
