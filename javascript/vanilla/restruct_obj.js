var form_keys = Object.keys(app.forms_old)
var old_forms = app.forms_old;
var new_old_forms = [];


form_keys.forEach(function(type) {
  var section = old_forms[type];

  section.forEach(function(item) {

    var result = [item].reduce(function(map, obj) {
      if (typeof obj.languages == 'undefined') {
        var sub_key = Object.keys(obj).filter(x => x != 'name' && x != 'url');
        sub_key.forEach(function(sub) {
          obj = obj[sub]
          obj.forEach(function(sub1) {
            [sub1].forEach(function(sub2) {
              map[sub1.name] = sub2.languages.reduce(function(map2, obj3) {
                map2[obj3.name] = obj3.url
                return map2;
              }, {});
            })
          })
        })
      } else {
        map[obj.name] = obj.languages.reduce(function(map2, obj2) {
          map2[obj2.name] = obj2.url
          return map2;
        }, {});
      }

      return map;
    }, {});
    console.log(result)
    new_old_forms.push(result)
  })

})



console.log(new_old_forms)
