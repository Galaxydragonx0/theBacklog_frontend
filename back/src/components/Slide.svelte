<div
class="embla"
use:emblaCarouselSvelte={{ options }}
on:emblaInit={onInit}
on:emblaScrollNext={scrollNext}
>
<div class="embla__container">
  {#each movieListItems as movie}
    <div class="embla__slide" style="">
      <div class="bg-img">
        <img
          class="bg-poster-img"
          alt="movie-poster"
          src="https://image.tmdb.org/t/p/original/{movie.poster_path}"
        />
      </div>
      <div class="info">
        <h2 class="title-name">{movie.title}</h2>
        <p class="title-overview">{movie.overview}</p>

        <!-- <form action="?/remove"> -->
        <button
          class="remove"
          on:click={() => {removeTitle(movie?.id, true)}}>remove</button
        >
        <!-- </form> -->
        <!-- <form action="?/completed"> -->
        <button
          class="completed"
          on:click={() => {completedTitle(movie)}}>mark as complete</button
        >
      <!-- </form> -->
      </div>
    </div>
  {/each}
</div>
<button
  class="embla__prev"
  style="color: springgreen;font-size: 2rem;position: absolute;top: 48%;left: 1rem;"
  on:click={scrollPrev}
  ><Icon icon="emojione-monotone:left-arrow" /></button
>
<button
  class="embla__next"
  style="color: springgreen;font-size: 2rem;position: absolute;top: 48%;right: 1rem;"
  on:click={scrollNext}
  ><Icon icon="emojione-monotone:right-arrow" /></button
>
</div>