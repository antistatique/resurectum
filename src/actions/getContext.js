module.exports = async () => {
  const config = await requirer(`${process.cwd()}/package.json`);

  let context = {
    slug: null,
    desc: null,
  };
  if (config.dependencies.fabricator) {
    context.slug = 'fabricator';
    context.desc = 'based on Fabricator like in old days';
  } else if (config.devDependencies && config.devDependencies['toolbox-utils'].includes('0.0')) {
    if (config.scripts && config.engines) {
      context.slug = 'mixed';
      context.desc = 'an old Toolbox project a bit updated';       
    } else {
      context.slug = 'old';
      context.desc = 'an old Toolbox project';             
    }
  } else if (config.scripts.start.includes('toolbox')) {
    context.slug = 'current';
    context.desc = 'a current Toolbox project with all the shiny stuff';           
  }

  return context;
}