var c = {};

c.name = 'Tech-Priest';
c.key = 'techpriest';
c.stats = {
  starting_hp: 6,
  load: '8+Str'
};
c.description = '<p class="based-on">The Tech-Priest is based on nothing.</p>';
c.starting_skills = ['still_the_machine_spirit', 'proficiency_auspex', 'hatred'];
c.starting_thrones = 15;
c.starting_gear = 'You start with a Metal Staff and a <item k="laspistol"></item>.';

module.exports = c;
