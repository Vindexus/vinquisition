module.exports = {
  name: 'Assassin',
  stats: {
    starting_hp: 8,
    load: '9+Str'
  },
  description: '<p class="based-on">The Assassin is based on the Ranger and Thief classes.</p>',
  starting_skills: ['backstab', 'poisoner', 'hunt_and_track', 'hatred', 'camouflage'],
  advanced_skills: ['faceless_one', 'envenom', 'cheap_shot', 'dirty_fighter'],
  starting_thrones: 20,
  starting_gear: '<p>You start with 5 rations, <item k="leather_armor"></item>, and 3 uses of your chosen poison. Choose your arms:</p><ul>' +
  '<li><item k="dagger"></item> and <item k="short_sword"></item></li>' +
  '<li><item k="rapier"></item></li></ul>' +
  '<p>Choose a ranged weapon:</p>' +
  '<ul><li>3 <item k="throwing_dagger"></item></li><li><item k="laspistol"></item> and 6 ammo</li></ul>'
};