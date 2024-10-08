<template>
  <div class="dns-panel main-right-panel">
    <ul class="top-tab" :class="{ running: running }">
      <li class="active">
        <span class="title">DNS IP: </span>
        <span class="ip"> {{ ip }}</span>
        <el-popover popper-class="dns-tips-popper" :show-after="800" width="auto">
          <template #default>
            <div>
              {{ $t('host.dnsInfo', { ip: `@${ip}` }) }}
            </div>
          </template>
          <template #reference>
            <yb-icon :svg="import('@/svg/question.svg?raw')" width="14" height="14" />
          </template>
        </el-popover>
      </li>
    </ul>
    <!-- <div class="top-tab" :class="{ running: running }">
      <span class="title">DNS IP: </span>
      <span class="ip"> {{ ip }}</span>
      <el-popover popper-class="dns-tips-popper" :show-after="800" width="auto">
        <template #default>
          <div>
            {{ $t('host.dnsInfo', { ip: `@${ip}` }) }}
          </div>
        </template>
        <template #reference>
          <yb-icon :svg="import('@/svg/question.svg?raw')" width="17" height="17" />
        </template>
      </el-popover>
    </div> -->
    <div class="main-block">
      <el-card>
        <template #header>
          <div class="table-header">
            <div class="left">
              <template v-if="running">
                <div class="status running" :class="{ disabled: fetching }">
                  <yb-icon :svg="import('@/svg/stop2.svg?raw')" @click.stop="dnsStop" />
                </div>
                <div class="status refresh" :class="{ disabled: fetching }">
                  <yb-icon :svg="import('@/svg/icon_refresh.svg?raw')" @click.stop="dnsStart" />
                </div>
              </template>
              <div v-else class="status" :class="{ disabled: fetching }">
                <yb-icon :svg="import('@/svg/play.svg?raw')" @click.stop="dnsStart" />
              </div>
            </div>
            <el-button @click.stop="cleanLog">{{ $t('base.clean') }}</el-button>
          </div>
        </template>
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              :row-height="60"
              :header-height="60"
              :columns="columns"
              :data="links"
              :width="width"
              :height="height"
              fixed
            >
            </el-table-v2>
          </template>
        </el-auto-resizer>
      </el-card>
    </div>
  </div>
</template>

<script lang="tsx" setup>
  import { DnsStore } from '@/store/dns'
  import { computed } from 'vue'
  import type { Column } from 'element-plus'
  import { dnsStart, dnsStop } from '@/util/Service'

  const dnsStore = DnsStore()
  const ip = computed(() => {
    return dnsStore.ip
  })
  const running = computed(() => {
    return dnsStore.running
  })
  const fetching = computed(() => {
    return dnsStore.fetching
  })
  const links = computed(() => {
    return dnsStore.log
  })
  const columns: Column<any>[] = [
    {
      key: 'host',
      title: 'host',
      dataKey: 'host',
      class: 'host-column',
      headerClass: 'host-column',
      width: 300,
      headerCellRenderer: () => {
        return (
          <span style="padding-left: 24px;" class="flex items-center">
            host
          </span>
        )
      },
      cellRenderer: ({ cellData: host }) => <span style="padding-left: 24px;">{host}</span>
    },
    {
      key: 'ip',
      title: 'ip',
      dataKey: 'ip',
      width: 240
    },
    {
      key: 'ttl',
      title: 'ttl',
      dataKey: 'ttl',
      width: 120
    }
  ]
  const cleanLog = () => {
    links.value.splice(0)
  }
</script>
