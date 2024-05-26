<template>
  <v-sheet class="d-flex flex-wrap">
    <v-sheet class="flex-1-0 ma-2 pa-2">
      <v-container>
        <v-row
          v-for="(record, rowIndex) in seats"
          :key="'row-' + rowIndex"
        >
          <v-col
            v-for="(seat, columnIndex) in record"
            :key="`(${rowIndex}, ${columnIndex})`"
            cols="2"
          >
            <v-card :variant="seat.student ? 'elevated' : 'tonal'">
              <v-card-text>
                {{ rowIndex * COLUMN + columnIndex + 1 + ": " + (seat.student?.name ?? "　　　　") }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-btn
          class="ma-4"
          color="primary"
          @click="exec()"
        >
          席替え
        </v-btn>
      </v-container>
    </v-sheet>

    <v-sheet class="ma-2 pa-2">
      <v-container>
        <client-only>
          <v-data-table :items="students">
            <template #item.isActive="{ item }">
              <v-checkbox v-model="item.isActive" />
            </template>
          </v-data-table>
        </client-only>
      </v-container>
    </v-sheet>
  </v-sheet>
</template>

<script setup lang="ts">
type Seat = { no: number, student: Student | null, isActive: boolean }
type Student = { name: string, isActive: boolean }

const ROW: number = 7
const COLUMN: number = 6
const students: Student[] = [
  { name: "佐々木 剛史", isActive: true },
  { name: "中村 祐一", isActive: true },
  { name: "萩田 隼人", isActive: true },
  { name: "工藤 正之", isActive: true },
  { name: "粟津 みゆき", isActive: true },
  { name: "鈴木 園子", isActive: true },
  { name: "長友 彩乃", isActive: true },
  { name: "岡本 直美", isActive: true },
  { name: "松尾 直文", isActive: true },
  { name: "安藤 亮", isActive: true },
  { name: "星野 稔", isActive: true },
  { name: "森口 智絵", isActive: true },
  { name: "大山 俊行", isActive: true },
  { name: "臼田 友宏", isActive: true },
  { name: "藤原 優希", isActive: true },
  { name: "山本 裕美", isActive: true },
  { name: "山本 莉沙", isActive: true },
  { name: "島田 真紀子", isActive: true },
  { name: "長友 猛", isActive: true },
  { name: "成川 浩太郎", isActive: true },
  { name: "矢野 拓", isActive: true },
  { name: "岩垣 文子", isActive: true },
  { name: "水谷 直美", isActive: true },
  { name: "渡辺 晶子", isActive: true },
  { name: "田島 裕久", isActive: true },
  { name: "岡 伸彦", isActive: true },
  { name: "中村 一博", isActive: true },
  { name: "大野 諭", isActive: true },
  { name: "浅子 悟", isActive: true },
  { name: "稲垣 葉月", isActive: true },
  { name: "鳥居 欣也", isActive: true },
  { name: "藤本 康二", isActive: true },
  { name: "小栗 友子", isActive: true },
  { name: "寺島 英紀", isActive: true },
  { name: "柿澤 裕子", isActive: true },
  { name: "大橋 剛", isActive: true },
  { name: "蔭山 孝宏", isActive: true },
]
const excludeSeatNos: number[] = [3, 4]
const seats: Ref<Seat[][]> = ref<Seat[][]>(Array
  .apply(null, new Array(ROW))
  .map((_, rowIndex) => Array
    .apply(null, new Array(COLUMN))
    .map((_, columnIndex) => {
      const seatNo = rowIndex * COLUMN + columnIndex + 1
      const seat: Seat = { no: seatNo, student: null, isActive: true }
      if (excludeSeatNos.find(no => no === seatNo)) seat.isActive = false
      return seat
    }),
  ),
)

onMounted(() => {
  exec()
})

function exec() {
  const target = shuffle(students)
  seats.value = setting(seats.value, target)
}

/**
 * @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
function shuffle(array: Student[]): Student[] {
  return (JSON.parse(JSON.stringify(array)) as Student[])
    .filter(student => student.isActive)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function setting(seats: Seat[][], students: Student[]): Seat[][] {
  return seats.map((row) => {
    return row.map((seat) => {
      if (seat.isActive) {
        seat.student = students.shift() ?? null
      }
      return seat
    })
  })
}
</script>
