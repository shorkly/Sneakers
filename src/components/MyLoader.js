import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={210}
        height={260}
        viewBox="0 0 210 260"
        backgroundColor="#f2f2f2"
        foregroundColor="#fafafa"
        {...props}
    >
        <rect x="0" y="16" rx="10" ry="10" width="150" height="91" />
        <rect x="0" y="142" rx="3" ry="3" width="93" height="15" />
        <rect x="0" y="179" rx="8" ry="8" width="80" height="24" />
        <rect x="118" y="171" rx="8" ry="8" width="32" height="32" />
        <rect x="0" y="123" rx="3" ry="3" width="150" height="15" />
    </ContentLoader>
)

export default MyLoader;