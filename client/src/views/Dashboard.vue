<template>
    <div>
    <h1>Dashboard</h1>
    <template v-if="!isLoading">
        <EventCard v-for="event in events" :key="event._id" :event="event" />
    </template>
    <p v-else>
        Loading events
    </p>
    </div>
</template>
    
<script>
import axios from 'axios'
import EventCard from '../components/EventCard'

export default {
    components: { EventCard },
    data () {
        return {
            isLoading: true,
            events: []
        }
    },
    created () {
        axios.get('http://127.0.0.1:5000/api/events').then(response => {
            this.events = response.data.events
            this.isLoading = false
        })
    }
}
</script>