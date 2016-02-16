Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

Handlebars.registerHelper("if_mod", function(index_count,mod,res, block) {
  if(parseInt(index_count)%(mod)=== res){
    return block.fn(this);
  }
});