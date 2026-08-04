import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Lock date: 05/08/2008 (Lavanya's birthday)
const UNLOCK_DAY = '05'
const UNLOCK_MONTH = '08'
const UNLOCK_YEAR = '2008'

const useGameStore = create(
  persist(
    (set, get) => ({
      // ─── Auth ──────────────────────────────────────────────
      isDateValidated: false,

      validateDate: (day, month, year) => {
        const d = day.padStart(2, '0')
        const m = month.padStart(2, '0')
        const y = year
        const valid = d === UNLOCK_DAY && m === UNLOCK_MONTH && y === UNLOCK_YEAR
        if (valid) set({ isDateValidated: true })
        return valid
      },

      // ─── Progress ──────────────────────────────────────────
      completedMonths: [],     // e.g. [1, 2, 3]
      currentMonth: null,      // which month screen is open

      completeMonth: (monthId) => {
        const { completedMonths } = get()
        if (!completedMonths.includes(monthId)) {
          set({ completedMonths: [...completedMonths, monthId] })
        }
      },

      isMonthUnlocked: (monthId) => {
        if (monthId === 1) return true
        const { completedMonths } = get()
        return completedMonths.includes(monthId - 1)
      },

      isMonthCompleted: (monthId) => {
        const { completedMonths } = get()
        return completedMonths.includes(monthId)
      },

      getUnlockedCount: () => {
        const { completedMonths } = get()
        return completedMonths.length
      },

      // ─── UI State ──────────────────────────────────────────
      toastMessage: null,

      showToast: (msg) => {
        set({ toastMessage: msg })
        setTimeout(() => set({ toastMessage: null }), 3000)
      },

      // ─── Reset ─────────────────────────────────────────────
      resetAll: () => {
        set({ isDateValidated: false, completedMonths: [], currentMonth: null })
      },
    }),
    {
      name: 'twelve-doors-of-love-v1',
      partialize: (state) => ({
        isDateValidated: state.isDateValidated,
        completedMonths: state.completedMonths,
      }),
    }
  )
)

export default useGameStore
