'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from '@heroui/react'
import { useAuth } from '@/context/AuthContext'
import { useManageRestaurant } from '@/services/hooks/useReservation'
import { IRestaurant } from '@/types/deal'
import { useTranslations } from 'next-intl'
import { useUploadFile } from '@/utils/file-upload'
import { AdminHeader } from '../design-system/Typography'

export default function SettingPage() {
  const t = useTranslations()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { profile } = useAuth()

  const { uploadFile, onLoadingPicture } = useUploadFile()

  const { restaurant, createRestaurant, updateRestaurant } =
    useManageRestaurant(profile?.restaurant_id, String(profile?.id))

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<Partial<IRestaurant>>({
    name: '',
    slug: '',
    description: '',
    brand_logo: '',
  })

  useEffect(() => {
    if (!restaurant) return

    setForm({
      name: restaurant.name ?? '',
      slug: restaurant.slug ?? '',
      description: restaurant.description ?? '',
      brand_logo: restaurant.brand_logo ?? '',
    })
  }, [restaurant])

  const handleChange = (key: keyof IRestaurant, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      const imageUrl = await uploadFile(file)

      handleChange('brand_logo', imageUrl)
    } catch (error) {
      console.error(error)
      alert('Upload failed')
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        name: form.name?.trim(),
        slug: form.slug?.trim(),
        description: form.description?.trim(),
        brand_logo: form.brand_logo?.trim(),
      }

      if (profile?.restaurant_id) {
        await updateRestaurant(payload)
      } else {
        await createRestaurant(payload)
      }

      alert('Restaurant saved successfully')
    } catch (error) {
      console.error(error)
      alert('Failed to save restaurant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form className="w-full max-w-2xl" onSubmit={onSubmit}>
        <Fieldset>
          <Fieldset.Legend>
            <AdminHeader title={t('admin.setting.title')} />
          </Fieldset.Legend>

          <Description>{t('admin.setting.description')}</Description>

          <FieldGroup>
            <div className="flex items-center gap-5">
              {onLoadingPicture ? (
                <div className="flex size-[120px] items-center justify-center rounded-full border border-gray-300">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
                </div>
              ) : (
                form.brand_logo && (
                  <Avatar className="size-[120px] rounded-full border border-gray-300">
                    <Avatar.Image alt="Logo" src={form.brand_logo} />
                    <Avatar.Fallback>Logo</Avatar.Fallback>
                  </Avatar>
                )
              )}

              <Button onPress={() => fileInputRef.current?.click()}>
                {t('admin.setting.form.picture')}
              </Button>
              <input
                ref={fileInputRef}
                hidden
                accept="image/*"
                type="file"
                onChange={handleLogoUpload}
              />
            </div>
            <TextField name="brand_logo" value={form.brand_logo ?? ''}>
              <Label>{t('admin.setting.form.image_url')}</Label>
              <Input
                onChange={(e) => handleChange('brand_logo', e.target.value)}
              />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="name"
              value={form.name ?? ''}
              validate={(value) => {
                if (!value) {
                  return t('admin.setting.required')
                }
                return null
              }}
            >
              <Label>{t('admin.setting.form.name')}</Label>
              <Input onChange={(e) => handleChange('name', e.target.value)} />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="slug"
              value={form.slug ?? ''}
              validate={(value) => {
                const validSlug = /^[a-z0-9-]+$/
                if (!value) {
                  return t('admin.setting.required')
                }
                if (!validSlug.test(value)) {
                  return 'a-z, 0-9, -'
                }
                return null
              }}
            >
              <Label>{t('admin.setting.form.url')}</Label>
              <Input
                onChange={(e) => {
                  const slug = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '')
                  handleChange('slug', slug)
                }}
              />
              <Description>{`${window?.location?.origin}/${form.slug}`}</Description>
              <FieldError />
            </TextField>

            <TextField
              isRequired
              value={form.description ?? ''}
              name="description"
              validate={(value) => {
                if (!value || value.trim().length < 10) {
                  return t('admin.setting.min_value')
                }

                return null
              }}
            >
              <Label>{t('admin.setting.detail')}</Label>
              <TextArea
                rows={5}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              <FieldError />
            </TextField>
          </FieldGroup>

          <Fieldset.Actions>
            <Button type="submit">Save Changes</Button>

            <Button
              type="reset"
              variant="danger"
              onPress={() => {
                if (!restaurant) return

                setForm({
                  name: restaurant.name ?? '',
                  slug: restaurant.slug ?? '',
                  description: restaurant.description ?? '',
                  brand_logo: restaurant.brand_logo ?? '',
                })
              }}
            >
              Cancel
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  )
}
