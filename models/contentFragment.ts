export type ContentFragmentTypes = 'heading-three' | 'paragraph' | 'heading-four' | 'image'

export type ChildrenFragmentProps = {
  text: string
}

export type ContentFragmentProps = {
  type: ContentFragmentTypes,
  children: ChildrenFragmentProps[]
}