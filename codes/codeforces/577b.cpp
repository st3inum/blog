#include <bits/stdc++.h>
using namespace std;

int32_t main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, ok = 0;
    cin >> n >> m;

    bitset<1003> last, nxt, reset(string(m, '1'));
    last[0] = 1;

    for (int i = 0, a; i < n; i++) {
        cin >> a;
        a %= m;
        nxt = ((last << a) | (last >> (m - a))) & reset;
        if (nxt[0]) {
            ok = 1;
            break;
        }
        last |= nxt;
    }

    cout << (ok ? "YES" : "NO") << '\n';
}
