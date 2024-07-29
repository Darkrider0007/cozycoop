import React from 'react'
import MotionWrap from '../motion-wrap'

function About() {
    return (
        <>
            <h2 className="text-2xl font-bold mt-14 text-center">About Cozy Coop</h2>
            <MotionWrap className="my-6">
                <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow-lg">
                    <p className="">
                        Cozy Coop is a community for people who want to live together in a shared living space.
                        We provide a platform for people to manage their shared expanses.
                    </p>
                    <p className="mt-4">
                        As a community, we believe that living together is a way to build a strong and
                        supportive bond. We want to create a space where people can share their experiences,
                        learn from each other, and build a sense of community.
                    </p>
                    <p className="mt-4 ">
                        <strong>Currently, we are just a concept.</strong> We are working hard to bring this
                        vision to life. Stay tuned for more updates!
                    </p>
                </div>
            </MotionWrap>
        </>
    )
}

export default About