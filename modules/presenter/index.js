
var util = require('util');
var Document = require('document');
var marked = require('marked');

// Create changeTable prototype object
function Presenter() {
  Document.apply(this, arguments);

  // default options
  this.template('/default.html');
}
util.inherits(Presenter, Document);
module.exports = Presenter;

// When only one directory level is given
Presenter.prototype.index = function () {

  // get main nodes
  var title = this
                .find().only().elem('title').toValue();

  var position = this
                  .find().only().attr('id', 'position').toValue()
                  .find().only().elem('span').toValue();

  var content =  this
                  .find().only().attr('id', 'content').toValue();

  var search = this
                  .find().only().attr('id', 'search').toValue();

  this.container([title, position, content, search]);

  // set document title and headline
  title
    .setContent('Piccolo – the isomorfic projection framework')
    .done();

  // set page position
  position
    .setContent('<a href="/">Home</a>')
    .done();

  // hide search
  search
    .setAttr('style', 'display: none;')
    .done();

  // create content
  this.readStatic('/page/home.md', function (error, text) {
    if (error) throw error;

    content
      .setContent( marked(text) )
      .done();
  });

};
