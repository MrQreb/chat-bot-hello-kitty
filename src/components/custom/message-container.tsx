import React, { ReactNode } from 'react'

interface MessageContainerProps {
    Avatar: ReactNode;
    Text?: ReactNode;
}

const MessageContainer = ({ Avatar, Text }: MessageContainerProps) => {
  return (
    <div className="mt-4 m-auto w-[95%] rounded-lg h-19 bg-gray-200 mb-4 grid grid-cols-[12%_87%] overflow-auto">
      <div>{Avatar}</div>
      <div>{Text}</div>
    </div>
  )
}

export default MessageContainer