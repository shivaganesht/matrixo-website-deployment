'use client'

import { useState } from 'react'
import SkillDNAAssessment from '@/components/skilldna/SkillDNAAssessment'
import SkillGenome from '@/components/skilldna/SkillGenome'

export default function SkillDNAPage() {
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [assessmentData, setAssessmentData] = useState<Record<number, string>>({})

  const handleComplete = (data: Record<number, string>) => {
    setAssessmentData(data)
    setAssessmentComplete(true)
  }

  return (
    <>
      {!assessmentComplete ? (
        <SkillDNAAssessment onComplete={handleComplete} />
      ) : (
        <SkillGenome data={assessmentData} />
      )}
    </>
  )
}
