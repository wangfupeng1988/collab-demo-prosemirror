import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { schema } from './schema'
import { EditorView } from 'prosemirror-view'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import '../style/style.css'

const ydoc = new Y.Doc()
// const serverUrl = 'wss://demos.yjs.dev'
const serverUrl = 'ws://localhost:1234'
const provider = new WebsocketProvider(serverUrl, 'my-room', ydoc)
const type = ydoc.getXmlFragment('prosemirror')

const editor = document.querySelector('#editor')

const prosemirrorView = new EditorView(editor, {
  state: EditorState.create({
    schema,
    plugins: [
      ySyncPlugin(type),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ].concat(exampleSetup({ schema })),
  }),
})
