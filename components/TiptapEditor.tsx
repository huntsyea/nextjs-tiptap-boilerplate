"use client"

import React, { useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { Markdown } from 'tiptap-markdown'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import Toolbar from './Toolbar'

const lowlight = createLowlight(common)

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        code: {
          HTMLAttributes: {
            class: 'bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-mono',
          },
        },
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
        languageClassPrefix: 'language-',
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'Start writing something amazing...',
      }),
      Markdown.configure({
        html: false,
        transformPastedText: true,
        transformCopiedText: true,
      }),
    ],
    content: '', // Set to an empty string to start with a blank editor
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
  })

  const handleUpdate = useCallback(() => {
    // Handle editor updates if needed
  }, [])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="p-4" />
    </div>
  )
}

export default TiptapEditor