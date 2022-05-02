var form_keys = Object.keys(app.forms_old)
var old_forms = app.forms_old;
var sections = Object.keys(app.forms_old).reduce(function(m, k) {
                m[k] = {}
                return m;
              }, {});

form_keys.forEach(function(type) {
  var type = type;
  var section = old_forms[type];
	var new_old_forms = {};

  section.forEach(function(item) {
    var result = [item].reduce(function(map, obj) {
      if (typeof [obj][0].languages == 'undefined') {
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
      Object.assign(new_old_forms,
        result
      )
  })
  Object.assign(sections[type],new_old_forms)
})



console.log(sections)
