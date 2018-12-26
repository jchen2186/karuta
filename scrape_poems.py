import requests
from bs4 import BeautifulSoup


def extract_poems(html, is_eng=False):
    """
    Given the HTML code, returns two lists, poets and poems.
    Lists are used to keep the order of the poems.
    """
    soup = BeautifulSoup(html, 'html.parser')
    lgs = soup.find_all('lg')
    poets = []
    poems = []

    for lg in lgs:
        lg_children = list(lg.children)

        # Counter is used to find the location of the poet's name
        counter = 0
        poem = []

        for child in lg_children:
            current_line = str(child).strip()

            if current_line.find('<center>') >= 0:
                counter += 1

                if counter == 2:
                    tmp_soup = BeautifulSoup(current_line, 'html.parser')
                    poet = tmp_soup.string
            
            elif counter == 2:
                if current_line not in ['<br/>', '']:
                    poem.append(current_line)

                    if len(poem) == 5:
                        break

        if poet:
            poets.append(poet)
            poems.append(poem)

    return poets, poems


def dict_to_csv(poets, poems, file_name):
    """
    Given two lists, poets and poems, writes a csv file where 
    the poet and each line of the poem are written to separate columns.
    Returns nothing.
    """
    with open(file_name, 'w') as fo:
        column_names = 'poet,line1,line2,line3,line4,line5\n'
        fo.write(column_names)

        for i, poet in enumerate(poets):
            fo.write('{0},"{1}","{2}","{3}","{4}","{5}"\n'.format(poet, poems[i][0], poems[i][1], poems[i][2], poems[i][3], poems[i][4]))


def main():
    jp_url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku3euc.html'
    romaji_url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku2rom.html'
    eng_url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku1eng.html'

    # Scrape each frame and write a csv file.
    jp_r = requests.get(jp_url)
    jp_html = jp_r.text
    jp_poets, jp_poems = extract_poems(jp_html)
    dict_to_csv(jp_poets, jp_poems, 'poems/jp.csv')

    romaji_r = requests.get(romaji_url)
    romaji_html = romaji_r.text
    romaji_poets, romaji_poems = extract_poems(romaji_html)
    dict_to_csv(romaji_poets, romaji_poems, 'poems/romaji.csv')

    eng_r = requests.get(eng_url)
    eng_html = eng_r.text
    eng_poets, eng_poems = extract_poems(eng_html, is_eng=True)
    dict_to_csv(eng_poets, eng_poems, 'poems/eng.csv')


if __name__ == '__main__':
    main()
