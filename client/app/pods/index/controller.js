import Ember from 'ember';

export default Ember.Controller.extend({
  result: false,

  ajax: Ember.inject.service(),

  actions: {
    fileLoaded: function(file) {
      let self = this;
      // console.log(file.filename, file.type, file.data, file.size);
      return self.get('ajax').request(`/api/imageRecognition`, {
        method: 'POST',
        data: {dataUri: file.data}
      }).then((result) => {
          Ember.set(self, "result", result.data);
          return;
        }, () => {
          return;
        });
    }
  }
});
