import React from 'react';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props} />;

export default waitFor;
