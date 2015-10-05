var c = {};

c.name = 'Guardsman';
c.key = 'guardsman';
c.stats = {
  starting_hp: 8
};
c.description = '<p class="based-on">The Guardsman is based on the Ranger and Fighter classes.</p>';
c.starting_skills = ['called_shot', 'hatred', 'suppressing_fire', 'grenade_expert'];
c.starting_thrones = 50;
c.starting_gear = 'Choose from: ' + 
'<ul><li>A <item k="lasgun"></item> or a <item k="shotgun"></item></li>' +
'<li>2 <item k="frag_grenade"></item>s or 1 <item k="krak_grenade"></item></li>' +
'</ul>';

module.exports = c;
