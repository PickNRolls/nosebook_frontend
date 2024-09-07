import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

const Frag = (props: { children: ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export const NoSsr = dynamic(() => Promise.resolve(Frag), {
  ssr: false
});

