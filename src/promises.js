(function() {

  // function sum(num1, num2) {
  //   return new Promise(function(resolve, reject) {
  //     resolve(num1 + num2);
  //   });
  // }
  // sum(11, 24).then(function(value) {
  //   console.log('first value: ' + value);
  //   return sum(value, 1);
  // })
  // .then(function(newValue) {
  //   console.log(newValue);
  //   return sum(newValue, 5)
  // })
  // .then(function(newerValue) {
  //   console.log(newerValue);
  // })

  //var promise = Promise.resolve($.ajax('http://pokeapi.co/api/v2/pokemon/1'));

  function ajaxPromise(url) {
    return Promise.resolve($.ajax(url));
  }

  ajaxPromise('http://pokeapi.co/api/v2/pokemon/250')
  .then(function(value) {
    var abilityURL = value.abilities[0].ability.url;
    return ajaxPromise(abilityURL)
  })
  .then(function(ability) {
    var pokemonWithAbility = ability.pokemon;
    var randomPoke = pokemonWithAbility[Math.floor(Math.random() * pokemonWithAbility.length)];
    return ajaxPromise(randomPoke.pokemon.url);
  })
  .then(function(pokemon) {
    $('body').append('<img src="' + pokemon.sprites.front_default + '">')
  })
  .catch(function(error) {
    console.log(error);
  })

}());
