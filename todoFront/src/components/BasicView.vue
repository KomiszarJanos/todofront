<template>
  <div class="container">
  <h1 > Folyamatban lévő projektek </h1>
    
  <table>
    <thead>
      <tr>
        <th>Határidős feladat</th>
        <th>Projekt név</th>
        <th>Kezdési dátum</th>
        <th>Elvégzett feladatok</th>
        <th>Feladat szerkesztése</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2025.03.02</td>
        <td>Lélegeztető beszerzés</td>
        <td>2024.12.23</td>
        <td>...</td>
        
      </tr>
    </tbody>

  </table>
</div>
</template>

<style scoped>
.container {position: relative;  width:100%; min-height: 400px; margin:0; padding:0;}
.container::before {content:""; position:fixed; top:0; left:0; width:100%; height: 100%; background-image: url(./sztelogo.jpg); background-position: center; background-repeat: no-repeat; background-size:contain; opacity: 0.3; z-index: -1;}
h1 {margin-top: 22px; margin-bottom: 12px; margin-left: auto; margin-right: auto;}
thead {background-color: rgb(184, 184, 189); width: 600px; padding: auto; margin-top: 12px; margin-top:12px; margin-left: auto; margin-right: auto;}
</style>
