import React, { useState } from 'react'
import { TicketSearch }  from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketsContainer = () => {
  const [searchTerms, setSearchTerms] = useState("")

  return <>
    <TicketSearch setterFunction={setSearchTerms} />
	<TicketList searchTermState={searchTerms} />
  </>
}