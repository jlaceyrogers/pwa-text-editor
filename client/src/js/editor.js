import { getDb, putDb } from './database';
import { header } from './header';

export default class TextEditor {
  constructor() {
    // Retrieve local data from localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror library is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize the CodeMirror editor
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load content from IndexedDB or local storage and inject it into the editor
    getDb().then((data) => {
      if (data) {
        console.info('Loaded data from IndexedDB, injecting into editor');
        this.editor.setValue(data);
      } else if (localData) {
        console.info('Loaded data from local storage, injecting into editor');
        this.editor.setValue(localData);
      } else {
        console.info('No data found, injecting default header into editor');
        this.editor.setValue(header);
      }
    });

    // Save editor content to local storage whenever there's a change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save editor content to IndexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
