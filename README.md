# angular-tribute

> An AngularJS 1.5+ wrapper for ZURB's [Tribute](https://github.com/zurb/tribute) library for native @mentions.

## Install

```js
$ npm install angular-tribute --save
```

**or** include the UMD build, hosted by [unpkg](https://unpkg.com) in a `<script>` tag. You will also need to include the main ZURB Tribute library:

```js
<script src="js/tribute.js"></script>
<script src="//unpkg.com/angular-tribute"></script>
```

## Usage

```js
import Angular from "angular";
import AngularTribute from "angular-tribute";

angular
  .module('myApp', [])
  .directive('angularTribute', ['$timeout', AngularTribute])
```

In your controller:
```js
  $scope.people = [
    { name: 'Adam',      email: 'adam@email.com' },
    { name: 'Amalie',    email: 'amalie@email.com', },
    { name: 'Estefanía', email: 'estefania@email.com', },
    { name: 'Adrian',    email: 'adrian@email.com', },
    { name: 'Wladimir',  email: 'wladimir@email.com', },
    { name: 'Samantha',  email: 'samantha@email.com', },
    { name: 'Nicole',    email: 'nicole@email.com', },
    { name: 'Natasha',   email: 'natasha@email.com', },
    { name: 'Michael',   email: 'michael@email.com', },
    { name: 'Nicolás',   email: 'nicole@email.com', }
  ];

  $scope.tributeConfig = {
    lookup: 'name',
    fillAttr: 'name'
  }

  $scope.tributeOnReplaced = function () {
    console.log('text replaced!');
  };

  $scope.tributeOnNoMatch = function () {
    console.log('no match found in collection!');
  };
```

And in your view you can add:
```html
  <textarea angular-tribute
    values="$ctrl.people"
    options="$ctrl.tributeConfig"
    on-replaced="$ctrl.tributeOnReplaced"
    on-no-match="$ctrl.tributeOnNoMatch"
  ></textarea>
```

> The `options`, `on-replaced` and `on-no-match` parameters are optional.

The `values` array should be an array of objects that contain a key and value like so:

```
[
  {key: "Phil Heartman", value: "pheartman"},
  {key: "Gordon Ramsey", value: "gramsey"}
]
```

You can modify this structure using the built-in [Tribute options](https://github.com/zurb/tribute#a-collection).

## Events

Tribute broadcasts two events — a `tribute-replaced` event, and a `tribute-no-match` event (see docs [here](https://github.com/zurb/tribute#replace-event)). For your convenience, you can bind to these events by passing a function to `on-replaced` or `on-no-match` attributes respectively.

## License

MIT © [ZURB](http://zurb.com)
