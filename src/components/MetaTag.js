import React from 'react';
import MetaTags from 'react-meta-tags';

export const MetaTag = props => (
  <MetaTags>
    <title>{props.title}</title>
    <meta id="meta-description" name="description"
          content={`${props.description}`}/>
    <meta id="og-title" property="og:title" content={`${props.title}`}/>
    <meta id="og-image" property="og:image" content={`/img/${props.image}`}/>
  </MetaTags>
);
