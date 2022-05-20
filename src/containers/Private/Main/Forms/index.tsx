import { FC } from 'react'
import { DatePicker, Space } from 'antd'
import moment from 'moment'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { generalSchema } from 'utils/formsSchema'
import { InputData } from 'types/Form'
import { general, address, work } from 'utils/formData'
import styles from './styles.module.scss'

const Forms: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generalSchema),
  })

  function onChange(date: any, dateString: any) {
    console.log(date, dateString)
  }
  function disabledDate(current: any) {
    return current && current > moment().startOf('day')
  }
  return (
    <form onSubmit={handleSubmit(data => console.log(data))} className={styles.form}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Ticket 1 - General Attendee</p>
        {general.map(el => (
          <label key={el.id} className={styles.inputArea}>
            {el.title}: <span className={styles.star}>* </span>
            <input {...register(el.id)} type={el.type} />{' '}
            {errors[el.id] && <span className={styles.error}>{errors[el.id].message}</span>}
          </label>
        ))}
        <div className={styles.inputArea}>
          <label className={styles.calendar}>
            Date of birth: <span className={styles.star}>* </span>
          </label>
          <Space direction="vertical" {...register('calendar')}>
            <DatePicker onChange={onChange} disabledDate={disabledDate} />
          </Space>{' '}
          {errors.calendar && <span className={styles.error}>{errors.calendar.message}</span>}
        </div>
      </div>

      <p className={styles.title}>Home Address</p>
      {address.map(el => (
        <div className={styles.inputArea} key={el.id}>
          {el.type !== 'sel' ? (
            <label>
              {el.title}: <span className={styles.star}>* </span>
              <input {...register(el.id)} type={el.type} />{' '}
              {errors[el.id] && <span className={styles.error}>{errors[el.id].message}</span>}
            </label>
          ) : (
            <>
              <label>
                {el.title}: <span className={styles.star}>* </span>
              </label>
              <select {...register(el.id)}>
                {el.options!.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>{' '}
              {errors[el.id] && <span className={styles.error}>{errors[el.id].message}</span>}
            </>
          )}
        </div>
      ))}
      <div className={styles.wrapper}>
        <p className={styles.title}>Work Information</p>
        {work.map(el => (
          <label key={el.id} className={styles.inputArea}>
            {el.title}: <input {...register(el.id)} type={el.type} />{' '}
            {errors[el.id] && <span>{errors[el.id].message}</span>}
          </label>
        ))}
      </div>
      <input type="submit" />
    </form>
  )
}

export default Forms
