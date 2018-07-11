<template>
  <div class="queue">
    <table class="queue-table">
      <tr class="table-header">
        <th>Value</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
      <tr>
        <td>Han Solo</td>
        <td>7/15/2018</td>
        <td><icon name="arrow-circle-right" scale="1.5"></icon></td>
      </tr>
      <tr>
        <td>Bastilla Shan</td>
        <td>7/15/2018</td>
        <td><icon name="arrow-circle-left" scale="1.5"></icon></td>
      </tr>
      <tr>
        <td>555-663-6345</td>
        <td>7/15/2018</td>
        <td><icon name="arrow-circle-right" scale="1.5"></icon></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .queue-table {
    margin-top: -20px;
    width: 100vw;
    margin-left: -20px;
    border-spacing: 0px;
  }
  .queue-table th {
    font-size: 24px;
    color: #FFFFFF;
    background-color: #1BBC98;
    border: 1px solid #1BBC98;
    padding: 5px 0;
  }
  .queue-table td {
    padding: 10px 0;
  }
  .queue-table .fa-icon {
    color: #1BBC98;
  }
  .table-header {
    // box-shadow: 0 1px 10px 0px #00000091;
    margin-bottom: 5px;
  }
</style>

