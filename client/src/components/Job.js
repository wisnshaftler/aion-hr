import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/Config";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Job = ({ job }) => {
    return (
        <>
            {
                job.map(singleJob => {
                    return <tr>
                        <td> {singleJob._id} </td>
                        <td> {singleJob.jobtitle} </td>
                        <td> {singleJob.jobdescription } </td>
                    </tr>
                })
            }
        </>
    )
}

export default Job;