module.exports = {
  name: 'Arbitrator',
  key: 'arbitrator',
  stats: {
    starting_hp: 10,
    starting_thrones: 20,
    load: '12+Str'
  },
  description: '<p class="based-on">The Arbitrator is based on the Paladin and Fighter classes.</p><p>As members of the Adeptus Arbites, Arbitrators are high level judges, juries, and executioners of the Imperium.</p>',
  starting_gear: 'You start with <item k="chainmail_armor"></item> and <item k="rations"></item>. Choose your weapon: <ul>' +
  '<li><item k="long_sword"></item> and <item k="shield"></item></li>' + 
  '<li><item k="halberd"></item></li></ul>' +
  'Choose one: <ul><li><item k="adventuring_gear"></item></li><li><item k="rations"></item> and <item k="medicae_kit"></item></li></ul>',
  starting_skills: ['i_am_the_law', 'armored', 'bend_bars_lift_gates', 'emperors_justice'],
  advanced_skills: ['merciless', 'bloodthirsty', 'interrogator', 'armor_mastery']
};
